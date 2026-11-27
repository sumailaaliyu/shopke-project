import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'

function Settings() {
  return (
    <DashboardLayout title="Settings">
      <Card>
        <h3>Nothing to set up here yet</h3>
        <p>
          Store name, colours and layout live under Customize store. Payment
          and contact details have their own pages.
        </p>
      </Card>
    </DashboardLayout>
  )
}

export default Settings