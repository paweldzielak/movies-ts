import React, { MouseEventHandler } from "react"
import { CloseIcon } from "@chakra-ui/icons"
import { Button, Icon } from "@chakra-ui/react"

export type ButtonParentBackground = 'dark' | 'light';

type ButtonProps = {
  bg: ButtonParentBackground,
  action: MouseEventHandler,
  className?: string
} 

const CloseClearButton: React.FC<ButtonProps> = ({ bg, action, className = '' }) => {
  if (bg === 'dark') return <Button className={className} position={'absolute'} variant="ghost" size="md" w="28px" h="28px" _hover={{ bgColor: 'whiteAlpha.500', border: '1px solid #ccc' }} onClick={action}>
    <Icon as={CloseIcon} fontSize="1.4rem" color='white' />
  </Button>
  return <Button size="md" w="28px" h="28px" position={'absolute'} _hover={{ bgColor: 'whiteAlpha.500', border: '1px solid #ccc' }} onClick={action}>
    <Icon as={CloseIcon} fontSize="1.4rem" color='white' />
  </Button>
}

export default CloseClearButton;