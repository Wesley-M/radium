/** 
 * @file Used to provide a place for toasts to be displayed on.
*/

import { useTheme } from "@design-system/theme"
import { Toaster } from "react-hot-toast"

export const HotToaster = () => {
  const { palette, radius } = useTheme()

  return (
      <Toaster
        position="bottom-right"
        containerStyle={{
          position: "absolute",
          bottom: 90
        }}
        toastOptions={{
          error: {
            style: {
              backgroundColor: palette("accent"),
              color: palette("tx-primary"),
              borderRadius: radius("md")
            },
            iconTheme: {
              primary: palette("tx-primary"),
              secondary: palette("tx-secondary"),
            }
          }
        }}
      />
  )
}