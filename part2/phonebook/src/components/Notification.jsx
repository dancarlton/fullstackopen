export default function Notification({ message }) {
  if (message === null) {
    return null
  }

  const className = message.startsWith('Error' ? 'error' : 'success')

  return (<div className={className}>{message}</div>)
}
