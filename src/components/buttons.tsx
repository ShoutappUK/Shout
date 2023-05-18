import { createUseStyles } from 'react-jss'
import { Buttons, Labels } from '../styles'

const useStyles = createUseStyles({ ...Buttons, ...Labels })

interface ButtonProps {
  children: React.ReactNode
}

export const MyButton: React.FC<ButtonProps> = ({ children }) => {
  const classes = useStyles()
  return (
    <button className={classes.myButton}>
      <span className={classes.myLabel}>{children}</span>
    </button>
  )
}
