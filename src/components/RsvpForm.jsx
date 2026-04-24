import { useState } from 'react'

const MIN_GUESTS = 1
const MAX_GUESTS = 10

export default function RsvpForm({ styles }) {
  const [submitted, setSubmitted] = useState(false)
  const [attending, setAttending] = useState('')
  const [guests, setGuests] = useState(1)
  const [guestInput, setGuestInput] = useState('1')
  const [guestNames, setGuestNames] = useState([''])
  const [errors, setErrors] = useState({})

  function syncGuestCount(value) {
    const count = Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, value))
    setGuests(count)
    setGuestNames(current => Array.from({ length: count }, (_, i) => current[i] || ''))
    return count
  }

  function validate() {
    const errs = {}
    if (!attending) errs.attending = 'Please let us know if you will be attending'
    guestNames.forEach((name, i) => {
      if (!name.trim()) errs[`guest_${i}`] = 'Please enter a name'
    })
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    const formData = {
      attending,
      guests,
      guest_names: guestNames.filter(n => n.trim()).join(', '),
      message: new FormData(e.target).get('message') || '',
    }
    fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(r => {
        if (r.ok) setSubmitted(true)
        else setErrors({ submit: 'Something went wrong. Please try again.' })
      })
      .catch(() => setErrors({ submit: 'Something went wrong. Please try again.' }))
  }

  if (submitted) {
    return (
      <div className={styles.rsvpThankYou}>
        {attending === 'yes' ? (
          <>
            <p className={styles.rsvpThankYouTitle}>JazakAllah Khair</p>
            <p className={styles.rsvpThankYouText}>
              Your presence will make our celebration complete. We cannot wait to share this blessed evening with you.
            </p>
          </>
        ) : (
          <>
            <p className={styles.rsvpThankYouTitle}>We'll Miss You</p>
            <p className={styles.rsvpThankYouText}>
              Though you won't be with us in person, you will be in our hearts and duas on this special day. JazakAllah Khair.
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <form
      className={styles.rsvpForm}
      name="rsvp"
      onSubmit={handleSubmit}
    >


      <p className={styles.rsvpHeading}>RSVP</p>
      <p className={styles.rsvpDeadline}>Kindly respond by April 5th, 2026</p>

      {/* Attendance */}
      <fieldset className={`${styles.rsvpFieldset} ${errors.attending ? styles.rsvpFieldsetError : ''}`}>
        <legend className={styles.rsvpLegend}>Will you be attending?</legend>
        <div className={styles.rsvpRadioGroup}>
          <label className={`${styles.rsvpRadioLabel} ${attending === 'yes' ? styles.rsvpRadioActive : ''} ${errors.attending ? styles.rsvpRadioError : ''}`}>
            <input
              type="radio"
              name="attending"
              value="yes"
              className={styles.rsvpRadioInput}
              onChange={() => { setAttending('yes'); setErrors(e => ({ ...e, attending: null })) }}
            />
            Joyfully Accept
          </label>
          <label className={`${styles.rsvpRadioLabel} ${attending === 'no' ? styles.rsvpRadioActive : ''} ${errors.attending ? styles.rsvpRadioError : ''}`}>
            <input
              type="radio"
              name="attending"
              value="no"
              className={styles.rsvpRadioInput}
              onChange={() => { setAttending('no'); setErrors(e => ({ ...e, attending: null })) }}
            />
            Regretfully Decline
          </label>
        </div>
        {errors.attending && <p className={styles.rsvpError}>{errors.attending}</p>}
      </fieldset>

      {/* Guest count — always visible */}
      <label className={styles.rsvpLabel}>
        How many souls in your party? <span className={styles.rsvpOptional}>(including yourself)</span>
        <input
          className={styles.rsvpInput}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name="guests"
          min="1"
          max="10"
          value={guestInput}
          onFocus={e => e.target.select()}
          onChange={e => {
            let value = e.target.value.replace(/\D/g, '')

            // The field starts at “1”. If someone taps the field and types 2–9,
            // many mobile browsers append it as “12”, “13”, etc.; treat that as
            // replacing the default 1. Keep “10” valid.
            if (guestInput === '1' && value.length === 2 && value.startsWith('1')) {
              value = value[1] === '0' ? '10' : value[1]
            }

            value = value.slice(0, 2)
            setGuestInput(value)

            if (value) {
              syncGuestCount(parseInt(value, 10))
            }
          }}
          onBlur={() => {
            const count = syncGuestCount(parseInt(guestInput, 10) || MIN_GUESTS)
            setGuestInput(String(count))
          }}
        />
      </label>

      {/* Name fields — always visible */}
      <div className={styles.rsvpLabel}>
        <span>Names of your party</span>
        {Array.from({ length: guests }).map((_, i) => (
          <div key={i}>
            <input
              className={`${styles.rsvpInput} ${errors[`guest_${i}`] ? styles.rsvpInputError : ''}`}
              type="text"
              name={`guest_name_${i + 1}`}
              placeholder={`Guest ${i + 1} full name`}
              value={guestNames[i] || ''}
              onChange={e => {
                const updated = [...guestNames]
                updated[i] = e.target.value
                setGuestNames(updated)
                setErrors(err => ({ ...err, [`guest_${i}`]: null }))
              }}
            />
            {errors[`guest_${i}`] && <p className={styles.rsvpError}>{errors[`guest_${i}`]}</p>}
          </div>
        ))}
      </div>

      {/* Hidden combined field for Netlify */}
      <input type="hidden" name="guest_names" value={guestNames.join(', ')} />

      {/* Optional message */}
      <label className={styles.rsvpLabel}>
        Message <span className={styles.rsvpOptional}>(optional)</span>
        <textarea
          className={styles.rsvpTextarea}
          name="message"
          rows="3"
        />
      </label>

      {errors.submit && <p className={styles.rsvpError}>{errors.submit}</p>}

      <button type="submit" className={styles.rsvpButton}>
        Send RSVP
      </button>
    </form>
  )
}
