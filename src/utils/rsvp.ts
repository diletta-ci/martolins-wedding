export interface Dietary {
  none: boolean
  celiac: boolean
  allergies: boolean
  allergies_detail: string
  vegetarian: boolean
  vegan: boolean
}

export interface Guest {
  nome: string
  cognome: string
  dietary: Dietary
}

export interface Child {
  name: string
  age: string
  dietary: Dietary
}

export interface RsvpForm {
  has_children: 'si' | 'no' | ''
  notes: string
}

export function newDietary(): Dietary {
  return { none: false, celiac: false, allergies: false, allergies_detail: '', vegetarian: false, vegan: false }
}

export function toggleDietaryNone(d: Dietary): void {
  if (d.none) {
    d.celiac = false
    d.allergies = false
    d.allergies_detail = ''
    d.vegetarian = false
    d.vegan = false
  }
}

export function clearDietaryNone(d: Dietary): void {
  if (d.celiac || d.allergies || d.vegetarian || d.vegan) d.none = false
}

export function serializeDietary(d: Dietary): string {
  if (d.none) return 'nessuna restrizione'
  const parts: string[] = []
  if (d.celiac) parts.push('celiachia')
  if (d.allergies)
    parts.push(d.allergies_detail ? `allergie alimentari (${d.allergies_detail})` : 'allergie alimentari')
  if (d.vegetarian) parts.push('vegetariano/a')
  if (d.vegan) parts.push('vegano/a')
  return parts.length ? parts.join(', ') : 'nessuna restrizione'
}

export function isDietaryFilled(d: Dietary): boolean {
  return d.none || d.celiac || d.allergies || d.vegetarian || d.vegan
}

export function buildRsvpPayload(
  guests: Guest[],
  children: Child[],
  form: RsvpForm,
): URLSearchParams {
  const hasChildren = form.has_children === 'si'
  const filledGuests = guests.filter(
    (g, i) => i === 0 || g.nome.trim() !== '' || g.cognome.trim() !== '',
  )
  const guestNames = filledGuests
    .map((g, i) => `${i + 1}. ${g.nome} ${g.cognome}`.trim())
    .join('\n')
  const adultAllergies = filledGuests
    .map((g, i) => `Adulto ${i + 1}: ${serializeDietary(g.dietary)}`)
    .join('; ')
  const childAllergies = hasChildren
    ? children.map((c, i) => `Bambino ${i + 1}: ${serializeDietary(c.dietary)}`).join('; ')
    : ''

  return new URLSearchParams({
    'form-name': 'rsvp',
    'bot-field': '',
    party_size: String(filledGuests.length),
    guest_names: guestNames,
    has_children: form.has_children,
    children_count: hasChildren ? String(children.length) : '',
    children_names: hasChildren ? children.map((c) => c.name).join(', ') : '',
    children_ages: hasChildren ? children.map((c) => String(c.age)).join(', ') : '',
    adult_allergies: adultAllergies,
    child_allergies: childAllergies,
    notes: form.notes,
  })
}
