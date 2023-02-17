import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ORTHOGRAPHY } from '../../constants/orthography'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  onUp: () => void
  onDown: () => void
  onLeft: () => void
  onRight: () => void
  onLose: () => void
  guesses: string[][]
}

export const Keyboard = ({ onChar, onDelete, onEnter, onLeft, onDown, onRight, onUp, onLose, guesses }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else if (value === 'RIGHT') {
      onRight()
    } else if (value === 'LEFT') {
      onLeft()
    } else if (value === 'UP') {
      onUp()
    } else if (value === 'DOWN') {
      onDown()
    } else if (value === 'ESCAPE') {
      onLose()
    } else {
      onChar(value)
    }
  }









  useEffect(() => {

    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else if (e.code === 'ArrowRight') {
        // Right Arrow
        onRight()
      } else if (e.code === 'ArrowLeft') {
        // Left Arrow
        onLeft()
      } else if (e.code === 'ArrowDown') {
        // Down Arrow
        onDown()
      } else if (e.code === 'ArrowUp') {
        // Up Arrow
        onUp()
      } else if (e.code === 'Escape') {
        // Lose on Escape key
        onLose()
      }
      // Take away key event listener for now
      // else {
      //   const key = e.key.toUpperCase()
      //   if (key.length === 1 && key >= 'A' && key <= 'Z') {
      //     onChar(key)
      //   }
      // }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar, onLeft, onRight, onDown, onUp, onLose])

  return (
      <div className="flex justify-center mb-1 flex-wrap self-center content-center items-center place-content-center">
        <div className="content-center flex flex-row flex-wrap">

        {ORTHOGRAPHY.slice(0, Math.floor(ORTHOGRAPHY.length * 0.4)).map(
          (char) => (
            <Key value={char} onClick={onClick} status={charStatuses[char]} />
            )
            )}
        {ORTHOGRAPHY.slice(
          Math.floor(ORTHOGRAPHY.length * 0.4),
          Math.floor(ORTHOGRAPHY.length * 0.74)
          ).map((char) => (
            <Key value={char} onClick={onClick} status={charStatuses[char]} />
            ))}

        {ORTHOGRAPHY.slice(
          Math.floor(ORTHOGRAPHY.length * 0.74),
          ORTHOGRAPHY.length
          ).map((char) => (
            <Key value={char} onClick={onClick} status={charStatuses[char]} />
            ))}
        <Key value="DELETE" onClick={onClick}>
        🔙
        </Key>
      </div>
            </div>
  )
}
