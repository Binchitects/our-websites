/** A six-band calibration strip: the Argus spectrum, used as a section marker. */
export function Spectrum({ className }: { className?: string }) {
  return (
    <div className={['spectrum', className].filter(Boolean).join(' ')} aria-hidden>
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}
