import { useState } from 'react'

export default function RsvpForm({ styles }) {
  const [submitted, setSubmitted] = useState(false)
  const [attending, setAttending] = useState('')
  const [guests, setGuests] = useState(1)
  const [guestNames, setGuestNames] = useState([''])
  const [errors, setErrors] = useState({})

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
          type="number"
          name="guests"
          min="1"
          max="10"
          value={guests}
          onChange={e => {
            const n = Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
            setGuests(n)
            setGuestNames(Array.from({ length: n }, (_, i) => guestNames[i] || ''))
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
