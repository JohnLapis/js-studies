// Generated by CoffeeScript 2.5.1
(function() {
  var Student, leo;

  Student = (function() {
    class Student {
      constructor(name, age, grade, friends) {
        this.name = name;
        this.age = age;
        this.grade = grade;
        this.friends = friends;
      }

      get() {
        return +_money.slice(1);
      }

      set(_money1) {
        this._money = _money1;
      }

      // toString: ->
      getInfo() {
        return {
          name: this.name,
          age: this.age,
          grade: this.grade,
          friends: this.friends
        };
      }

    };

    Student.prototype._money = "$30";

    Student.school = "harvard";

    return Student;

  }).call(this);

  leo = new Student("leo", 12, 9, ["one", "two", "three"]);

  leo.money = 60;

  console.log(leo.getInfo());

  console.log("======================================================");

  console.slog = function(text) {
    console.log(text);
    return console.log(eval(text));
  };

  console.slog("12 is 12 is true");

  console.slog("fortunately, 12 isnt 13 is false");

  console.slog("blink() if lamp? and light is on");

  console.slog("payment ?= money");

  console.slog("positivity = greeting ? \"money\"");

  console.slog("1 is in [1..10]");

}).call(this);
