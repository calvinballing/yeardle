import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'

import React from 'react'

import CountDownTimer from './components/CountDownTimer'
import { InfoModal } from './components/modals/InfoModal'
import $ from 'jquery'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  question,
  pre,
  post,
  fact,
} from './lib/words'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import { CONFIG } from './constants/config'
import ReactGA from 'react-ga'
import '@bcgov/bc-sans/css/BCSans.css'
const ALERT_TIME_MS = 5000

function App() {
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  //const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')

  const handleRanOutOfTime = (
    didRunOutOfTime: boolean | ((prevState: boolean) => boolean)
  ) => {
    setRanOutOfTime(didRunOutOfTime)
  }
  const [ranOutOfTime, setRanOutOfTime] = React.useState(false)
  const [touchedBomb, setTouchedBomb] = React.useState(false)

  const [guesses, setGuesses] = useState<string[][]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses
      .map((guess) => guess.join(''))
      .includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }

    return loaded.guesses
  })

  window.onload = function () {
    $('button:nth-of-type(15)').focus()
  }

  const TRACKING_ID = CONFIG.googleAnalytics // YOUR_OWN_TRACKING_ID

  if (TRACKING_ID && process.env.NODE_ENV !== 'test') {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.pageview(window.location.pathname)
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon && !ranOutOfTime && !touchedBomb) {
      setSuccessAlert(`✅ Room Complete!\n\n${fact}\n\nProceed to next room`)
    }
  }, [isGameWon, isGameLost, ranOutOfTime, touchedBomb])

  const onChar = (value: string) => {
    if (
      currentGuess.length < CONFIG.wordLength &&
      guesses.length < CONFIG.tries &&
      !isGameWon &&
      !ranOutOfTime &&
      !touchedBomb
    ) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onUp = () => {
    const focused = document.activeElement as HTMLElement
    var priorElement = focused?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    priorElement = priorElement?.previousElementSibling as HTMLElement
    if (priorElement !== undefined) {
      priorElement.focus()
    }

    const death = ['💀', '💣', '💥']
    if (death.includes(priorElement.innerText)) {
      setTouchedBomb(true)
    }
  }

  const onDown = () => {
    const focused = document.activeElement as HTMLElement
    var nextElement = focused?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    nextElement = nextElement?.nextElementSibling as HTMLElement
    if (nextElement !== undefined) {
      nextElement.focus()
    }

    const death = ['💀', '💣', '💥']
    if (death.includes(nextElement.innerText)) {
      setTouchedBomb(true)
    }
  }

  const onLeft = () => {
    const focused = document.activeElement as HTMLElement
    const priorElement = focused?.previousElementSibling as HTMLElement
    if (priorElement !== null) {
      priorElement.focus()
    }

    const death = ['💀', '💣', '💥']
    if (death.includes(priorElement.innerText)) {
      setTouchedBomb(true)
    }
  }

  const onRight = () => {
    const focused = document.activeElement as HTMLElement
    const nextElement = focused?.nextElementSibling as HTMLElement
    if (nextElement !== null) {
      nextElement.focus()
    }

    const death = ['💀', '💣', '💥']
    if (death.includes(nextElement.innerText)) {
      setTouchedBomb(true)
    }
  }

  const onEnter = () => {
    const focused = document.activeElement as HTMLElement
    focused.focus()
    if (isGameWon || isGameLost) {
      return
    }
    /*if (!(currentGuess.length === CONFIG.wordLength)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }
    */

    if (
      currentGuess.length === CONFIG.wordLength &&
      !isWordInWordList(currentGuess.join(''))
    ) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    const winningWord = isWinningWord(currentGuess.join(''))

    if (
      currentGuess.length === CONFIG.wordLength &&
      guesses.length < CONFIG.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        return setIsGameWon(true)
      }

      if (guesses.length === CONFIG.tries - 1) {
        setIsGameLost(true)
      }
    }

    focused.focus()
  }

  return (
    <div className="py-1 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h1 className="text-3xl pb-3 self-place-center text-center font-bold self-center justify-center">
        {CONFIG.language}
      </h1>

      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col">
          <div className="flex flex-row"></div>
          <div className="pr-8 pb-4 text-center text-9xl">{question}</div>

          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            onUp={onUp}
            onDown={onDown}
            onLeft={onLeft}
            onRight={onRight}
            guesses={guesses}
          />
        </div>
        <Grid guesses={guesses} currentGuess={currentGuess} />
      </div>

      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />

      <Alert
        message="Not enough letters"
        isOpen={
          false
          //isNotEnoughLetters
        }
      />
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`❌ The answer was ${pre} ${solution} ${post}.\n\n${fact}\n\nReturn to prior room.`}
        isOpen={isGameLost && !isGameWon}
      />

      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
      <Alert
        message={`⏱️ You ran out of time.\n\n${fact}\n\nReturn to prior room.`}
        isOpen={ranOutOfTime}
      />

      <Alert
        message={`💥 You stepped on the wrong tile.\n\n${fact}\n\nReturn to prior room.`}
        isOpen={touchedBomb}
      />

      <CountDownTimer
        hours={0}
        minutes={3}
        seconds={0}
        handleRanOutOfTime={handleRanOutOfTime}
      />
    </div>
  )
}

export default App
