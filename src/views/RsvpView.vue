<script setup lang="ts">
import { ref, computed } from 'vue'

// ── Dietary helpers ───────────────────────────────────────────────────────────
interface Dietary {
  none: boolean
  celiac: boolean
  allergies: boolean
  allergies_detail: string
  vegetarian: boolean
  vegan: boolean
}

function newDietary(): Dietary {
  return { none: false, celiac: false, allergies: false, allergies_detail: '', vegetarian: false, vegan: false }
}

function toggleDietaryNone(d: Dietary) {
  if (d.none) {
    d.celiac = false
    d.allergies = false
    d.allergies_detail = ''
    d.vegetarian = false
    d.vegan = false
  }
}

function clearDietaryNone(d: Dietary) {
  if (d.celiac || d.allergies || d.vegetarian || d.vegan) d.none = false
}

function serializeDietary(d: Dietary): string {
  if (d.none) return 'nessuna restrizione'
  const parts: string[] = []
  if (d.celiac) parts.push('celiachia')
  if (d.allergies) parts.push(d.allergies_detail ? `allergie alimentari (${d.allergies_detail})` : 'allergie alimentari')
  if (d.vegetarian) parts.push('vegetariano/a')
  if (d.vegan) parts.push('vegano/a')
  return parts.length ? parts.join(', ') : 'nessuna restrizione'
}

// ── Guest list ───────────────────────────────────────────────────────────────
interface Guest {
  nome: string
  cognome: string
  dietary: Dietary
}

const guests = ref<Guest[]>([{ nome: '', cognome: '', dietary: newDietary() }])

function addGuest() {
  guests.value.push({ nome: '', cognome: '', dietary: newDietary() })
}

function removeGuest(index: number) {
  if (guests.value.length > 1) {
    guests.value.splice(index, 1)
  }
}

// ── Children ─────────────────────────────────────────────────────────────────
interface Child {
  name: string
  age: string
  dietary: Dietary
}

const children = ref<Child[]>([{ name: '', age: '', dietary: newDietary() }])

function addChild() {
  children.value.push({ name: '', age: '', dietary: newDietary() })
}

function removeChild(index: number) {
  if (children.value.length > 1) {
    children.value.splice(index, 1)
  }
}

// ── Form state ───────────────────────────────────────────────────────────────
const form = ref({
  has_children: '' as 'si' | 'no' | '',
  notes: '',
})

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

// ── Conditional visibility ───────────────────────────────────────────────────
const showChildren = computed(() => form.value.has_children === 'si')

// ── Submit ───────────────────────────────────────────────────────────────────
async function handleSubmit() {
  submitting.value = true
  submitError.value = ''

  const filledGuests = guests.value.filter(
    (g, i) => i === 0 || g.nome.trim() !== '' || g.cognome.trim() !== '',
  )
  const guestNames = filledGuests
    .map((g, i) => `${i + 1}. ${g.nome} ${g.cognome}`.trim())
    .join('\n')

  const adultAllergies = filledGuests
    .map((g, i) => `Adulto ${i + 1}: ${serializeDietary(g.dietary)}`)
    .join('; ')

  const childAllergies = showChildren.value
    ? children.value.map((c, i) => `Bambino ${i + 1}: ${serializeDietary(c.dietary)}`).join('; ')
    : ''

  const payload = new URLSearchParams({
    'form-name': 'rsvp',
    'bot-field': '',
    party_size: String(filledGuests.length),
    guest_names: guestNames,
    has_children: form.value.has_children,
    children_count: showChildren.value ? String(children.value.length) : '',
    children_names: showChildren.value ? children.value.map((c) => c.name).join(', ') : '',
    children_ages: showChildren.value ? children.value.map((c) => c.age).join(', ') : '',
    adult_allergies: adultAllergies,
    child_allergies: childAllergies,
    notes: form.value.notes,
  })

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    })
    if (res.ok) {
      submitted.value = true
    } else {
      submitError.value =
        'Qualcosa è andato storto. Riprova o scrivici direttamente.'
    }
  } catch {
    submitError.value = 'Errore di rete. Controlla la connessione e riprova.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Conferma di presenza">
    <img src="/tit-rsvp.png" alt="RSVP" class="page-title-img" />
  </section>

  <!-- ─── Success state ────────────────────────────────────────────────── -->
  <section v-if="submitted" class="rsvp-success">
    <div class="rsvp-success-inner">
      <div class="success-icon" aria-hidden="true">♡</div>
      <h2 class="success-heading">Grazie mille!</h2>
      <p class="success-body">
        Abbiamo ricevuto la vostra conferma. Non vediamo l'ora di festeggiare
        insieme a voi il 29 agosto!
      </p>
      <p class="success-signature">Marta &amp; Giacomo</p>
    </div>
  </section>

  <!-- ─── Form ─────────────────────────────────────────────────────────── -->
  <section v-else class="rsvp-form-section">
    <p class="rsvp-deadline">
      Facci sapere se ci sarai entro il <strong>31 luglio 2026</strong>.
    </p>
    <form
      class="rsvp-form"
      name="rsvp"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
      novalidate
    >
      <!-- Required by Netlify for JS-rendered forms -->
      <input type="hidden" name="form-name" value="rsvp" />
      <!-- Honeypot: visually hidden, must stay empty for humans -->
      <p class="visually-hidden">
        <label>Don't fill this out: <input name="bot-field" autocomplete="off" /></label>
      </p>

      <!-- ── Gruppo 1: I partecipanti ────────────────────────────────── -->
      <fieldset class="form-group">
        <legend class="group-legend">
          <span class="group-number">1</span>
          I partecipanti
        </legend>

        <TransitionGroup name="guest-row" tag="div" class="guest-list">
          <div
            v-for="(guest, index) in guests"
            :key="index"
            class="guest-row"
          >
            <div class="guest-fields">
              <div class="field">
                <label class="field-label" :for="`nome_${index}`">
                  Nome
                  <span v-if="index === 0" class="field-required" aria-hidden="true">*</span>
                </label>
                <input
                  :id="`nome_${index}`"
                  v-model="guest.nome"
                  type="text"
                  class="field-input"
                  placeholder="Maria"
                  :required="index === 0"
                />
              </div>
              <div class="field">
                <label class="field-label" :for="`cognome_${index}`">
                  Cognome
                  <span v-if="index === 0" class="field-required" aria-hidden="true">*</span>
                </label>
                <input
                  :id="`cognome_${index}`"
                  v-model="guest.cognome"
                  type="text"
                  class="field-input"
                  placeholder="Rossi"
                  :required="index === 0"
                />
              </div>
              <div class="field guest-fields__dietary">
                <p class="field-label">Esigenze alimentari — Adulto {{ index + 1 }}</p>
                <div class="checkbox-group">
                  <label class="checkbox-option checkbox-option--none">
                    <input type="checkbox" v-model="guest.dietary.none" @change="toggleDietaryNone(guest.dietary)" />
                    <span class="checkbox-mark" />
                    <span class="checkbox-text">Nessuna restrizione, mangio tutto</span>
                  </label>
                  <div class="dietary-divider" aria-hidden="true" />
                  <label class="checkbox-option">
                    <input type="checkbox" v-model="guest.dietary.celiac" @change="clearDietaryNone(guest.dietary)" />
                    <span class="checkbox-mark" />
                    <span class="checkbox-text">Celiachia</span>
                  </label>
                  <label class="checkbox-option">
                    <input type="checkbox" v-model="guest.dietary.allergies" @change="clearDietaryNone(guest.dietary)" />
                    <span class="checkbox-mark" />
                    <span class="checkbox-text">Allergie alimentari</span>
                  </label>
                  <Transition name="slide-down">
                    <div v-if="guest.dietary.allergies" class="field field--indent">
                      <label class="field-label" :for="`allergies_detail_adult_${index}`">Specificare quali allergie</label>
                      <input
                        :id="`allergies_detail_adult_${index}`"
                        v-model="guest.dietary.allergies_detail"
                        type="text"
                        class="field-input"
                        placeholder="es. arachidi, latticini, glutine…"
                      />
                    </div>
                  </Transition>
                  <label class="checkbox-option">
                    <input type="checkbox" v-model="guest.dietary.vegetarian" @change="clearDietaryNone(guest.dietary)" />
                    <span class="checkbox-mark" />
                    <span class="checkbox-text">Dieta vegetariana</span>
                  </label>
                  <label class="checkbox-option">
                    <input type="checkbox" v-model="guest.dietary.vegan" @change="clearDietaryNone(guest.dietary)" />
                    <span class="checkbox-mark" />
                    <span class="checkbox-text">Dieta vegana</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              v-if="guests.length > 1"
              type="button"
              class="btn-remove-guest"
              :aria-label="`Rimuovi partecipante ${index + 1}`"
              @click="removeGuest(index)"
            >
              ×
            </button>
          </div>
        </TransitionGroup>

        <button type="button" class="btn-add-guest" @click="addGuest">
          <span class="btn-add-icon" aria-hidden="true">+</span>
          Aggiungi partecipante
        </button>
      </fieldset>

      <!-- ── Gruppo 2: I bambini ─────────────────────────────────────── -->
      <fieldset class="form-group">
        <legend class="group-legend">
          <span class="group-number">2</span>
          I bambini
        </legend>

        <div class="field">
          <p class="field-label" id="children-label">
            Ci sono dei bambini?
            <span class="field-required" aria-hidden="true">*</span>
          </p>
          <div class="radio-group" role="radiogroup" aria-labelledby="children-label">
            <label class="radio-option">
              <input type="radio" v-model="form.has_children" value="si" required />
              <span class="radio-mark" />
              <span class="radio-text">Sì</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="form.has_children" value="no" required />
              <span class="radio-mark" />
              <span class="radio-text">No</span>
            </label>
          </div>
        </div>

        <Transition name="slide-down">
          <div v-if="showChildren" class="conditional-fields">
            <TransitionGroup name="guest-row" tag="div" class="child-list">
              <div
                v-for="(child, index) in children"
                :key="index"
                class="child-entry"
              >
                <div class="child-entry-header">
                  <span class="child-entry-label">Bambino {{ index + 1 }}</span>
                  <button
                    v-if="children.length > 1"
                    type="button"
                    class="btn-remove-guest"
                    :aria-label="`Rimuovi bambino ${index + 1}`"
                    @click="removeChild(index)"
                  >
                    ×
                  </button>
                </div>
                <div class="field">
                  <label class="field-label" :for="`child_name_${index}`">Nome</label>
                  <input
                    :id="`child_name_${index}`"
                    v-model="child.name"
                    type="text"
                    class="field-input"
                    placeholder="Nome del bambino"
                    required
                  />
                </div>
                <div class="field">
                  <label class="field-label" :for="`child_age_${index}`">Età</label>
                  <input
                    :id="`child_age_${index}`"
                    v-model="child.age"
                    type="number"
                    class="field-input field-input--age"
                    min="0"
                    max="17"
                    placeholder="Anni"
                    required
                  />
                </div>
                <div class="field">
                  <p class="field-label">Esigenze alimentari</p>
                  <div class="checkbox-group">
                    <label class="checkbox-option checkbox-option--none">
                      <input type="checkbox" v-model="child.dietary.none" @change="toggleDietaryNone(child.dietary)" />
                      <span class="checkbox-mark" />
                      <span class="checkbox-text">Nessuna restrizione, mangio tutto</span>
                    </label>
                    <div class="dietary-divider" aria-hidden="true" />
                    <label class="checkbox-option">
                      <input type="checkbox" v-model="child.dietary.celiac" @change="clearDietaryNone(child.dietary)" />
                      <span class="checkbox-mark" />
                      <span class="checkbox-text">Celiachia</span>
                    </label>
                    <label class="checkbox-option">
                      <input type="checkbox" v-model="child.dietary.allergies" @change="clearDietaryNone(child.dietary)" />
                      <span class="checkbox-mark" />
                      <span class="checkbox-text">Allergie alimentari</span>
                    </label>
                    <Transition name="slide-down">
                      <div v-if="child.dietary.allergies" class="field field--indent">
                        <label class="field-label" :for="`allergies_detail_child_${index}`">Specificare quali allergie</label>
                        <input
                          :id="`allergies_detail_child_${index}`"
                          v-model="child.dietary.allergies_detail"
                          type="text"
                          class="field-input"
                          placeholder="es. arachidi, latticini, glutine…"
                        />
                      </div>
                    </Transition>
                    <label class="checkbox-option">
                      <input type="checkbox" v-model="child.dietary.vegetarian" @change="clearDietaryNone(child.dietary)" />
                      <span class="checkbox-mark" />
                      <span class="checkbox-text">Dieta vegetariana</span>
                    </label>
                    <label class="checkbox-option">
                      <input type="checkbox" v-model="child.dietary.vegan" @change="clearDietaryNone(child.dietary)" />
                      <span class="checkbox-mark" />
                      <span class="checkbox-text">Dieta vegana</span>
                    </label>
                  </div>
                </div>
              </div>
            </TransitionGroup>

            <button type="button" class="btn-add-guest" @click="addChild">
              <span class="btn-add-icon" aria-hidden="true">+</span>
              Aggiungi bambino
            </button>
          </div>
        </Transition>
      </fieldset>

      <!-- ── Gruppo 3: Note aggiuntive ─────────────────────────────── -->
      <fieldset class="form-group">
        <legend class="group-legend">
          <span class="group-number">3</span>
          Note aggiuntive
        </legend>

        <div class="field">
          <label class="field-label" for="notes">
            Vuoi dirci qualcosa in più?
          </label>
          <p class="field-hint field-hint--standalone">Informazioni extra, richieste particolari, o semplicemente un messaggio per noi</p>
          <textarea
            id="notes"
            v-model="form.notes"
            class="field-textarea"
            rows="4"
            placeholder="Scrivi qui…"
          />
        </div>
      </fieldset>

      <!-- ── Error message ──────────────────────────────────────────── -->
      <p v-if="submitError" class="form-error" role="alert">
        {{ submitError }}
      </p>

      <!-- ── Submit ─────────────────────────────────────────────────── -->
      <div class="form-footer">
        <button type="submit" class="btn-submit" :disabled="submitting">
          <span v-if="submitting" class="btn-spinner" aria-hidden="true" />
          {{ submitting ? 'Invio in corso…' : 'Conferma la presenza' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
/* ── Page header ─────────────────────────────────────────────────────────── */
.page-header {
  background-color: var(--wedding-brand);
  background-image: radial-gradient(
    ellipse 70% 80% at 50% 40%,
    rgba(255, 255, 255, 0.09) 0%,
    transparent 70%
  );
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title-img {
  width: 100%;
  max-width: var(--content-wide);
  height: auto;
  filter: invert(1);
  mix-blend-mode: screen;
}

/* ── Deadline note ───────────────────────────────────────────────────────── */
.rsvp-deadline {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--wedding-ink-muted);
  text-align: center;
  max-width: 38ch;
  margin: 0 auto 2rem;
}

.rsvp-deadline strong {
  color: var(--wedding-ink);
  font-weight: 500;
}

/* ── Success state ───────────────────────────────────────────────────────── */
.rsvp-success {
  padding: 5rem 1.5rem;
  display: flex;
  justify-content: center;
}

.rsvp-success-inner {
  max-width: 480px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.success-icon {
  font-size: 3rem;
  color: var(--wedding-brand);
  line-height: 1;
}

.success-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-brand-dark);
}

.success-body {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--wedding-ink);
}

.success-signature {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--wedding-brand);
  line-height: 1.1;
  margin-top: 0.5rem;
}

/* ── Form section ────────────────────────────────────────────────────────── */
.rsvp-form-section {
  padding: 3rem 1.5rem 4rem;
  background-color: var(--wedding-surface);
}

.rsvp-form {
  max-width: 620px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ── Form groups (fieldsets) ─────────────────────────────────────────────── */
.form-group {
  border: 1px solid var(--wedding-border);
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  background-color: var(--wedding-white);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.group-legend {
  font-family: var(--font-heading);
  font-size: 1.1875rem;
  font-weight: 500;
  color: var(--wedding-brand-dark);
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0 0.25rem;
  float: left;
  width: 100%;
  margin-bottom: 0.25rem;
}

.group-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  background-color: var(--wedding-brand);
  color: var(--wedding-white);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  flex-shrink: 0;
}

/* ── Fields ──────────────────────────────────────────────────────────────── */
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field--indent {
  margin-left: 2rem;
  border-left: 2px solid var(--wedding-border);
  padding-left: 1rem;
}

.field-label {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--wedding-ink);
}

.field-required {
  color: var(--wedding-brand);
  margin-left: 0.2em;
}

.field-hint {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: var(--wedding-ink-muted);
  font-weight: 400;
  display: block;
  margin-top: 0.125rem;
}

.field-hint--standalone {
  margin-top: 0;
}


.field-input,
.field-textarea,
.field-select {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--wedding-ink);
  background-color: var(--wedding-surface);
  border: 1px solid var(--wedding-border);
  border-radius: 8px;
  padding: 0.625rem 0.875rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  width: 100%;
  outline: none;
}

.field-input:focus,
.field-textarea:focus,
.field-select:focus {
  border-color: var(--wedding-brand);
  box-shadow: 0 0 0 3px rgba(141, 166, 212, 0.2);
}

.field-textarea {
  resize: vertical;
  min-height: 7rem;
  line-height: 1.6;
}

/* ── Age input ───────────────────────────────────────────────────────────── */
.field-input--age {
  max-width: 110px;
}

.field-input--age::-webkit-outer-spin-button,
.field-input--age::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.field-input--age[type=number] {
  -moz-appearance: textfield;
}

/* Screen-reader only label */
.field-label--sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ── Select wrapper (custom arrow) ───────────────────────────────────────── */
.select-wrapper {
  position: relative;
  display: block;
}

.select-wrapper--narrow {
  max-width: 180px;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  right: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--wedding-ink-muted);
  pointer-events: none;
}

.field-select {
  appearance: none;
  padding-right: 2.25rem;
  cursor: pointer;
}

/* ── Radio buttons ───────────────────────────────────────────────────────── */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.25rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
}

.radio-option input[type='radio'] {
  display: none;
}

.radio-mark {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid var(--wedding-border);
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.15s ease;
}

.radio-mark::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background-color: var(--wedding-brand);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.radio-option input[type='radio']:checked + .radio-mark {
  border-color: var(--wedding-brand);
}

.radio-option input[type='radio']:checked + .radio-mark::after {
  opacity: 1;
}

.radio-text {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--wedding-ink);
}

/* ── Checkboxes ──────────────────────────────────────────────────────────── */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
}

.checkbox-option input[type='checkbox'] {
  display: none;
}

.checkbox-mark {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 4px;
  border: 2px solid var(--wedding-border);
  flex-shrink: 0;
  position: relative;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.checkbox-mark::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 0px;
  width: 5px;
  height: 9px;
  border-right: 2px solid var(--wedding-white);
  border-bottom: 2px solid var(--wedding-white);
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.checkbox-option input[type='checkbox']:checked + .checkbox-mark {
  background-color: var(--wedding-brand);
  border-color: var(--wedding-brand);
}

.checkbox-option input[type='checkbox']:checked + .checkbox-mark::after {
  opacity: 1;
}

.dietary-divider {
  height: 1px;
  background-color: var(--wedding-border-soft);
  margin: 0.25rem 0;
}

.checkbox-option--none .checkbox-text {
  font-style: italic;
  color: var(--wedding-ink-muted);
}

.checkbox-option--none input:checked ~ .checkbox-text {
  color: var(--wedding-ink);
  font-style: normal;
}

.checkbox-text {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--wedding-ink);
}

/* ── Child list ──────────────────────────────────────────────────────────── */
.child-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 0.75rem;
}

.child-entry {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.5rem;
  background: var(--wedding-surface);
}

.child-entry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.child-entry-label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--wedding-brand-dark);
  letter-spacing: 0.02em;
}

/* ── Guest list ──────────────────────────────────────────────────────────── */
.guest-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.guest-row {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
}

.guest-fields {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.guest-fields__dietary {
  grid-column: 1 / -1;
}

@media (max-width: 420px) {
  .guest-fields {
    grid-template-columns: 1fr;
  }
}

/* ── Remove guest button ─────────────────────────────────────────────────── */
.btn-remove-guest {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  margin-top: 1.875rem;
  border: 1px solid var(--wedding-border);
  border-radius: 50%;
  background-color: transparent;
  color: var(--wedding-ink-muted);
  font-size: 1.125rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
}

.child-entry-header .btn-remove-guest {
  margin-top: 0;
}

.btn-remove-guest:hover {
  border-color: #c0392b;
  color: #c0392b;
  background-color: #fef0ee;
}

/* ── Add guest button ────────────────────────────────────────────────────── */
.btn-add-guest {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  margin-top: 0.25rem;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--wedding-brand);
  background: transparent;
  border: 1.5px dashed var(--wedding-brand-light);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
}

.btn-add-guest:hover {
  border-color: var(--wedding-brand);
  background-color: var(--wedding-brand-pale);
}

.btn-add-icon {
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 400;
}

/* ── Conditional fields transition ───────────────────────────────────────── */
.conditional-fields {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease, max-height 0.25s ease;
  overflow: hidden;
  max-height: 300px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
  max-height: 0;
}

/* ── Guest row transition ─────────────────────────────────────────────────── */
.guest-row-enter-active,
.guest-row-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.guest-row-enter-from,
.guest-row-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Error ───────────────────────────────────────────────────────────────── */
.form-error {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: #c0392b;
  background-color: #fef0ee;
  border: 1px solid #f5c6c2;
  border-radius: 8px;
  padding: 0.875rem 1rem;
}

/* ── Submit button ───────────────────────────────────────────────────────── */
.form-footer {
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--wedding-white);
  background-color: var(--wedding-brand);
  border: none;
  border-radius: 40px;
  padding: 0.875rem 2.5rem;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
  box-shadow: 0 2px 12px rgba(141, 166, 212, 0.35);
}

.btn-submit:hover:not(:disabled) {
  background-color: var(--wedding-brand-dark);
  box-shadow: 0 4px 18px rgba(107, 127, 175, 0.45);
  transform: translateY(-1px);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(141, 166, 212, 0.3);
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: var(--wedding-white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Accessibility ───────────────────────────────────────────────────────── */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
