function Student(name, surname, birthYear) {
    const maxArrayLength = 10;
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
    this.attendance = new Array(maxArrayLength);
    this.marks = new Array(maxArrayLength);
}

Student.prototype.getAge = function () {
    return (new Date).getFullYear() - this.birthYear;
};

Student.prototype.addValueToArray = function (array, value) {
    const currentIndex = array.findIndex(element => typeof element === 'undefined');
    const falseIndex = -1;
    if (currentIndex === falseIndex) {
        throw new Error('You have entered the maximum number of values');
    }
    array[currentIndex] = value;
};

Student.prototype.present = function () {
    return this.addValueToArray(this.attendance, true);
};

Student.prototype.absent = function () {
    return this.addValueToArray(this.attendance, false);
};

Student.prototype.mark = function (mark) {
    const minMark = 0;
    const maxMark = 10;
    if (mark >= minMark && mark <= maxMark) {
        return this.addValueToArray(this.marks, mark);
    } else {
        throw new Error('You have entered an invalid value');
    }
};

Student.prototype.getAverageValue = function (array) {
    const filledValues = array.filter(element => typeof element !== 'undefined');
    const sumValues = filledValues.reduce((prevValue, currentValue) => prevValue + currentValue);
    return sumValues / filledValues.length;
};

Student.prototype.summary = function () {
    const averageMark = this.getAverageValue(this.marks);
    const averageAttendance = this.getAverageValue(this.attendance);
    const comparableMark = 9;
    const comparableAttendance = 0.9;

    if (averageMark >= comparableMark && averageAttendance >= comparableAttendance) {
        return 'Ути какой молодчинка!';
    } else if (averageMark >= comparableMark || averageAttendance >= comparableAttendance) {
        return 'Норм, но можно лучше';
    } else {
        return 'Редиска!';
    }

};

const descriptorsToArray = Object.entries(Object.getOwnPropertyDescriptors(Student.prototype));
descriptorsToArray.forEach(element => {
    const [, val] = element;
    val.enumerable = false;
});
Object.defineProperties(Student.prototype, Object.fromEntries(descriptorsToArray));

const ivan = new Student('Ivan', 'Petrov', '1995');
ivan.present();