const COLORS = [
  '#faafa8',
  '#f39f76',
  '#fff8b8',
  '#e2f6d3',
  '#b4ddd3',
  '#d4e4ed',
  '#aeccdc',
  '#d3bfdb',
  '#f6e2dd',
  '#e9e3d4',
  '#efeff1',
]

function hexToRgb(hex: string) {
  let r = 0
  let g = 0
  let b = 0

  if (hex.length === 4) {
    r = parseInt(`${hex[1]}${hex[1]}`, 16)
    g = parseInt(`${hex[2]}${hex[2]}`, 16)
    b = parseInt(`${hex[3]}${hex[3]}`, 16)
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16)
    g = parseInt(hex.slice(3, 5), 16)
    b = parseInt(hex.slice(5, 7), 16)
  }
  return `rgb(${r}, ${g}, ${b})`
}

describe('CREATE A NEW NOTE', () => {
  it('create note', () => {
    cy.visit('/')

    cy.get('div')
      .contains(/take a note.../i)
      .click()

    cy.get('input[placeholder=title]').type('New note')
    cy.get('textarea[placeholder="take a note..."]').type(
      'New note description',
    )
    cy.get('button[name="select-color"]').click()
    cy.get(`label[for="color_${COLORS[1]}"]`).click()
    cy.get(`button[style="background-color: ${hexToRgb(COLORS[1])};"]`).should(
      'exist',
    )

    cy.get('button[id="is-favorite"]').click()
    cy.get('button svg[data-is-favorite=true]').should('exist')

    cy.get('button[type="submit"]').contains(/save/i).should('exist')
    cy.get('button[type="submit"]').click()

    cy.get('h2')
      .contains(/New note/i)
      .should('exist')
    cy.get('p')
      .contains(/New note description/i)
      .should('exist')
  })
})
