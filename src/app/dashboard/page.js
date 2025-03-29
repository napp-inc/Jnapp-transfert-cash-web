'use client'; // Obligatoire ici

import DashboardContent from '../../components/DashboardContent'
//import DashboardMenu from '../../components/DashboardMenu';
//import RealtimeMap from '../../components/RealTimeMap';
import Menu from "../../components/DashboardMenu";

export default function Home() {
  return (
    <div className='flex flex-col sm:flex-row gap-0 '>
      <Menu />
      <DashboardContent />
    </div>
  )
}