import { describe, it, expect } from 'vitest'
import {
  type Dietary,
  newDietary,
  serializeDietary,
  toggleDietaryNone,
  clearDietaryNone,
  isDietaryFilled,
  buildRsvpPayload,
} from './rsvp'

// ── serializeDietary ──────────────────────────────────────────────────────────

describe('serializeDietary', () => {
  it('returns "nessuna restrizione" when none is checked', () => {
    const d: Dietary = { ...newDietary(), none: true }
    expect(serializeDietary(d)).toBe('nessuna restrizione')
  })

  it('returns "nessuna restrizione" when nothing is checked', () => {
    expect(serializeDietary(newDietary())).toBe('nessuna restrizione')
  })

  it('serializes celiac alone', () => {
    const d: Dietary = { ...newDietary(), celiac: true }
    expect(serializeDietary(d)).toBe('celiachia')
  })

  it('serializes allergies without detail', () => {
    const d: Dietary = { ...newDietary(), allergies: true }
    expect(serializeDietary(d)).toBe('allergie alimentari')
  })

  it('serializes allergies with detail', () => {
    const d: Dietary = { ...newDietary(), allergies: true, allergies_detail: 'arachidi' }
    expect(serializeDietary(d)).toBe('allergie alimentari (arachidi)')
  })

  it('serializes vegetarian', () => {
    const d: Dietary = { ...newDietary(), vegetarian: true }
    expect(serializeDietary(d)).toBe('vegetariano/a')
  })

  it('serializes vegan', () => {
    const d: Dietary = { ...newDietary(), vegan: true }
    expect(serializeDietary(d)).toBe('vegano/a')
  })

  it('serializes multiple restrictions joined with comma', () => {
    const d: Dietary = { ...newDietary(), celiac: true, vegetarian: true }
    expect(serializeDietary(d)).toBe('celiachia, vegetariano/a')
  })
})

// ── toggleDietaryNone ─────────────────────────────────────────────────────────

describe('toggleDietaryNone', () => {
  it('clears all other options when none is checked', () => {
    const d: Dietary = { ...newDietary(), none: true, celiac: true, vegetarian: true }
    toggleDietaryNone(d)
    expect(d.celiac).toBe(false)
    expect(d.vegetarian).toBe(false)
    expect(d.allergies).toBe(false)
    expect(d.allergies_detail).toBe('')
    expect(d.vegan).toBe(false)
  })

  it('does nothing when none is unchecked', () => {
    const d: Dietary = { ...newDietary(), none: false, celiac: true }
    toggleDietaryNone(d)
    expect(d.celiac).toBe(true)
  })
})

// ── clearDietaryNone ──────────────────────────────────────────────────────────

describe('clearDietaryNone', () => {
  it('unchecks none when any other option is selected', () => {
    const d: Dietary = { ...newDietary(), none: true, celiac: true }
    clearDietaryNone(d)
    expect(d.none).toBe(false)
  })

  it('leaves none unchanged when no other option is selected', () => {
    const d: Dietary = { ...newDietary(), none: true }
    clearDietaryNone(d)
    expect(d.none).toBe(true)
  })
})

// ── isDietaryFilled ───────────────────────────────────────────────────────────

describe('isDietaryFilled', () => {
  it('returns false when nothing is selected', () => {
    expect(isDietaryFilled(newDietary())).toBe(false)
  })

  it('returns true when none is selected', () => {
    expect(isDietaryFilled({ ...newDietary(), none: true })).toBe(true)
  })

  it('returns true when any restriction is selected', () => {
    expect(isDietaryFilled({ ...newDietary(), vegan: true })).toBe(true)
  })
})

// ── buildRsvpPayload ──────────────────────────────────────────────────────────

describe('buildRsvpPayload', () => {
  it('builds correct payload for a single guest without children', () => {
    const guests = [{ nome: 'Maria', cognome: 'Rossi', dietary: { ...newDietary(), none: true } }]
    const children = [{ name: '', age: '', dietary: newDietary() }]
    const form = { has_children: 'no' as const, notes: '' }

    const params = Object.fromEntries(buildRsvpPayload(guests, children, form))

    expect(params['party_size']).toBe('1')
    expect(params['guest_names']).toBe('1. Maria Rossi')
    expect(params['has_children']).toBe('no')
    expect(params['children_count']).toBe('')
    expect(params['children_names']).toBe('')
    expect(params['adult_allergies']).toBe('Adulto 1: nessuna restrizione')
    expect(params['child_allergies']).toBe('')
  })

  it('builds correct payload with multiple guests', () => {
    const guests = [
      { nome: 'Maria', cognome: 'Rossi', dietary: { ...newDietary(), none: true } },
      { nome: 'Luca', cognome: 'Bianchi', dietary: { ...newDietary(), celiac: true } },
    ]
    const form = { has_children: 'no' as const, notes: 'nessuna nota' }

    const params = Object.fromEntries(buildRsvpPayload(guests, [], form))

    expect(params['party_size']).toBe('2')
    expect(params['guest_names']).toBe('1. Maria Rossi\n2. Luca Bianchi')
    expect(params['adult_allergies']).toBe('Adulto 1: nessuna restrizione; Adulto 2: celiachia')
    expect(params['notes']).toBe('nessuna nota')
  })

  it('ignores extra guests with empty name and surname', () => {
    const guests = [
      { nome: 'Maria', cognome: 'Rossi', dietary: { ...newDietary(), none: true } },
      { nome: '', cognome: '', dietary: newDietary() },
    ]
    const form = { has_children: 'no' as const, notes: '' }

    const params = Object.fromEntries(buildRsvpPayload(guests, [], form))

    expect(params['party_size']).toBe('1')
  })

  it('includes children data when has_children is si', () => {
    const guests = [{ nome: 'Maria', cognome: 'Rossi', dietary: { ...newDietary(), none: true } }]
    const children = [{ name: 'Giulia', age: '5', dietary: { ...newDietary(), none: true } }]
    const form = { has_children: 'si' as const, notes: '' }

    const params = Object.fromEntries(buildRsvpPayload(guests, children, form))

    expect(params['children_count']).toBe('1')
    expect(params['children_names']).toBe('Giulia')
    expect(params['children_ages']).toBe('5')
    expect(params['child_allergies']).toBe('Bambino 1: nessuna restrizione')
  })
})
