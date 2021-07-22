/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faHashtag,
  faLongArrowAltUp,
  faPlaneArrival,
  faSpaceShuttle,
  faTools,
  faUserAstronaut,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const SingleStat = ({ icon, title, subtitle }) => (
  <div className="single-stat">
    <FontAwesomeIcon icon={icon} />
    <h3>{title}</h3>
    <span>{subtitle}</span>
  </div>
);

export default function CompanyStats({ stats }) {
  const statsMapping = useMemo(() => ({
    flightsQuantity: {
      icon: faHashtag,
      title: stats.flightsQuantity,
      subtitle: 'Cantidad de vuelos',
    },
    vehicleType: {
      icon: faSpaceShuttle,
      title: stats.vehicleType,
      subtitle: 'Tipo de vehículo',
    },
    maxAltitude: {
      icon: faLongArrowAltUp,
      title: `${stats.maxAltitude} kms`,
      subtitle: 'Altura máxima',
    },
    hasEscapeSystem: {
      icon: faExclamationTriangle,
      title: stats.hasEscapeSystem ? 'Sí' : 'No',
      subtitle: 'Tiene sistema de escape',
    },
    crewedFlightOn: {
      icon: faUserAstronaut,
      title: stats.crewedFlightOn && format(parseISO(stats.crewedFlightOn), 'PPP'),
      subtitle: 'Fecha primer vuelto tripulado',
    },
    requiresPilot: {
      icon: faTools,
      title: stats.requiresPilot ? 'Sí' : 'No',
      subtitle: 'Requiere pilotos',
    },
    passengersQuantity: {
      icon: faUsers,
      title: stats.passengersQuantity,
      subtitle: 'Cantidad de pasajeros',
    },
    landingType: {
      icon: faPlaneArrival,
      title: stats.landingType,
      subtitle: 'Tipo de aterrizaje',
    },
  }), [stats]);

  return (
    <div className="company-stats">
      <SingleStat {...statsMapping.flightsQuantity} />
      <SingleStat {...statsMapping.vehicleType} />
      <SingleStat {...statsMapping.maxAltitude} />
      <SingleStat {...statsMapping.hasEscapeSystem} />
      <SingleStat {...statsMapping.crewedFlightOn} />
      <SingleStat {...statsMapping.requiresPilot} />
      <SingleStat {...statsMapping.passengersQuantity} />
      <SingleStat {...statsMapping.landingType} />
    </div>
  );
}
