import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button } from 'react-bootstrap'
import { Color } from '../constants/colors'

interface Props {
  hasNotification: boolean
  children: React.ReactNode
  style?: React.CSSProperties
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  onClick?: () => void
}

export function NotifiableButton({ hasNotification, children, style, variant, onClick }: Props) {
  return (
    <Container hasNotification={hasNotification} style={style}>
      <Button variant={variant} onClick={onClick}>
        {children}
      </Button>
    </Container>
  )
}

const Container = styled.div<{ hasNotification: boolean }>`
  ${(props) =>
    props.hasNotification &&
    css`
      position: relative;
      &::after {
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: ${Color.Notification};
        position: absolute;
        right: -5px;
        top: -5px;
      }
    `}
`
