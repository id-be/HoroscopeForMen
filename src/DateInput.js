export default function DateInput( {date, onMyChange} ) {

  return(
        <input
        onChange={onMyChange}
        className="DateInput"
        type="date"
        id="start"
        name="trip-start"
        min="2000-01-01"
        value={date}
        max="2099-12-31"
        />
  )
}