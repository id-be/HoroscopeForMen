export default function GetCurrentDate() {
  const date = new Date()
  const today = Intl.DateTimeFormat("en-US").format(date)
  return (today);
}

