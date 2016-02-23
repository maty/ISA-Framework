$('.datepicker, .datepicker-sidebar').pickadate({
selectMonths: true,// Creates a dropdown to control month
selectYears: 15,// Creates a dropdown of 15 years to control year
// The title label to use for the month nav buttons
labelMonthNext: 'Próximo Mes',
labelMonthPrev: 'Mes Anterior',
// The title label to use for the dropdown selectors
labelMonthSelect: 'Selecione un Mes',
labelYearSelect: 'Selecione un año',
// Months and weekdays
monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Ago', 'Nov', 'Dic' ],
weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado' ],
weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
// Materialize modified
weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
// Today and clear
today: 'Hoy',
clear: 'Limpiar',
close: 'Cerrar',
// The format to show on the `input` element
format: 'd mmmm, yyyy'
});


