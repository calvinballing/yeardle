import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        Guess the YEARDLE in 6 tries. After each guess, the color of the tiles
        will change to show how close your guess was to the answer.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="N" status="correct" />
        <Cell value="E" />
        <Cell value="V" />
        <Cell value="E" />
        <Cell value="R" />
      </div>
      <p className="text-sm text-gray-500">
        The letter N is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="G" />
        <Cell value="O" />
        <Cell value="N" status="present" />
        <Cell value="N" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500">
        The letter N is in the word once, but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="G" />
        <Cell value="I" />
        <Cell value="V" />
        <Cell value="E" />
        <Cell value="U" status="absent" />
      </div>
      <p className="text-sm text-gray-500">
        The letter U is not in the word in any spot.
      </p>
    </BaseModal>
  )
}
