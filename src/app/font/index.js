import localFront from "next/font/local"

export const GTFont = localFront({
  src: [
    {
      path: "./GTWalsheimPro-Bold.ttf",
      weight: "900",
      style: "bolder"
    },
    {
      path: "./GTWalsheimPro-Medium.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "./GTWalsheimPro-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "./GTWalsheimPro-Light.ttf",
      weight: "200",
      style: "normal"
    }
  ]
})