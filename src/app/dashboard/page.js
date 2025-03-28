'use client'; // Obligatoire ici

import DashboardContent from '../../components/DashboardContent'
//import DashboardMenu from '../../components/DashboardMenu';
//import RealtimeMap from '../../components/RealTimeMap';
import Menu from "../../components/DashboardMenu";

export default function Home() {
  return (
    <div className='dashbord-page'>
      <Menu />
      <DashboardContent />
    </div>
  )
}