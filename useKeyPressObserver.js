import { useEffect, useState } from "react"

function fromEventCode(code) {
  const prefixRegex = /Key|Digit/gi
  return code.replace(prefixRegex, "")
}

function equal(watchedKey, eventCode) {
  return fromEventCode(eventCode).toUpperCase() === watchedKey.toUpperCase()
}

export function usePressObserver({ watchKey }) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    function handlePressStart({ code }) {
      if (pressed || !equal(watchKey, code)) return
      setPressed(true)
    }

    function handlePressFinish({ code }) {
      if (!pressed || !equal(watchKey, code)) return
      setPressed(false)
    }

    document.addEventListener("keydown", handlePressStart)
    document.addEventListener("keyup", handlePressFinish)

    return () => {
      document.removeEventListener("keydown", handlePressStart)
      document.removeEventListener("keyup", handlePressFinish)
    }
  }, [watchKey, pressed, setPressed])

  return pressed
}
