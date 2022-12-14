import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'warning'
}

export const Alert = ({ isOpen, message, variant = 'warning' }: Props) => {
  const classes = classNames(
    'fixed top-0 left-0 transform w-full h-full pointer-events-auto overflow-hidden place-content-center items-center place-items-center content-center flex justify-center content-center place-items-center place-conent-center self-center items-center',
    {
      'bg-[#8a001e]': variant === 'warning',
      'text-white': variant === 'warning',
      'bg-[#31a348] z-20': variant === 'success',
      'text-gray-900': variant === 'success',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
          <p className="p-4 text-5xl font-bold text-center font-medium place-self-center self-center items-center whitespace-pre-line">
            {message}
          </p>
      </div>
    </Transition>
  )
}
