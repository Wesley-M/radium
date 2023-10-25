/** 
 * @file Used to provide a place for toasts to be displayed on.
*/

import { useTheme } from "@design-system/theme"
import { Toaster } from "react-hot-toast"

export const HotToaster = () => {
  const { theme, palette, radius } = useTheme()
  
  return (
      <Toaster
        position="bottom-right"
        containerStyle={{
          position: "absolute",
          bottom: theme("components.player.compact.height")
        }}
        toastOptions={{
          error: {
            style: {
              backgroundColor: palette("accent"),
              color: palette("tx-white"),
              borderRadius: radius("md")
            },
            iconTheme: {
              primary: palette("tx-white"),
              secondary: palette("tx-black"),
            }
          }
        }}
      />
  )
}