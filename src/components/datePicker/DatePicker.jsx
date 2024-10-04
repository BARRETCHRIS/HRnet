import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = props => {
  const { selectedDate, onChange } = props;

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      {...props}
    />
  );
};

export default DatePicker;

// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const DatePicker = ({ selectedDate, onChange }) => {
//   return (
//     <ReactDatePicker
//       selected={selectedDate}
//       onChange={onChange}
//       dateFormat="dd/MM/yyyy"
//     />
//   );
// };

// export default DatePicker;