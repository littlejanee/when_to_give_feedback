import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { Color } from '../constants/colors'

interface Props {
  children: React.ReactNode
  onClick?: () => void
}

export function Readmore({ children, onClick }: Props) {
  const [showMore, setShowMore] = useState(false)

  const onClickReadMore = useCallback(() => {
    setShowMore(!showMore)
    onClick?.()
  }, [onClick, showMore])

  return (
    <Container showLess={!showMore}>
      {children}
      <Button onClick={onClickReadMore}>{showMore ? 'Show less' : 'Show more'}</Button>
    </Container>
  )
}

const Container = styled.div<{ showLess: boolean }>`
  ${({ showLess }) => css`
    overflow: hidden;
    position: relative;
    padding: 8px 8px 28px 8px;
    font-size: 14px;
    white-space: pre-line;

    ${showLess &&
    css`
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
  `}
`

const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 0%;
  background: transparent;
  color: ${Color.Primary};
  border: none;
  font-size: 12px;
`
