export function TableButton ({ className, textButton, iconSVG, filter, onClick }) {
  return (
    <button className={className} onClick={onClick}><img src={iconSVG} style={{ width: 'auto', height: '23px', filter, paddingBottom: '2px' }} /> {textButton}</button>
  )
}
