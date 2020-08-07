import React from 'react';
import PropTypes from 'prop-types';
import { addBusinessDays, format, isToday, isWeekend } from 'date-fns';
import { nl } from 'date-fns/locale';

export class ShippingDateCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.getShippingDay = this.getShippingDay.bind(this);
  }

  getShippingDay() {
    const { shippingDays } = this.props;
    const date = new Date('08/08/2020');
    let nextBD = addBusinessDays(date, shippingDays ?? 1);
    if (isWeekend(nextBD)) {
      nextBD = addBusinessDays(nextBD, 1);
    }
    if (isToday(nextBD)) {
      return 'Vandaag verzonden';
    }

    return `Uiterlijk ${format(nextBD, 'EEEE dd MMM', {
      locale: nl,
    })} verzonden`;
  }

  render() {
    return <React.Fragment>{this.getShippingDay()}</React.Fragment>;
  }
}

ShippingDateCalculator.propTypes = {
  shippingDays: PropTypes.number,
};
