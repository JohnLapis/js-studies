class Student
  @_money: "$30"
  @school: "harvard"

  constructor: (@name, @age, @grade, @friends) ->

  get: -> $_money
  set: (@_money) ->

  # toString: ->
  getInfo: ->
    return
        name: @name
        age: @age
        grade: @grade
        friends: @friends


leo = new Student "leo", 12, 9, ["one", "two", "three"]
leo.money = 60

console.log leo.getInfo()

console.log "======================================================"

console.slog = (text) ->
  console.log text
  console.log eval text

console.slog "12 is 12 is true"
console.slog "fortunately, 12 isnt 13 is false"
console.slog "blink() if lamp? and light is on"
console.slog "payment ?= money"
console.slog "positivity = greeting ? \"money\""
console.slog "1 is in [1..10]"
