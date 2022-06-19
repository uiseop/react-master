import { useEffect, useState } from 'react'

const useFadeIn = (): [boolean, boolean] => {
  const [opacity, setOpacity] = useState(false)
  const [tranlateY, setTranslateY] = useState(false)

  useEffect(() => {
    setOpacity(true)
    setTranslateY(true)
  }, [])

  return [opacity, tranlateY]
}

export default useFadeIn
