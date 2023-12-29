export const dateFormatterFn = (date) => {
  const formatter = new Intl.DateTimeFormat("en-NG", {
    dateStyle: "long",
    timeStyle: "short",
  })
  
  const transformDate = new Date(date)
  return formatter.format(transformDate)
}