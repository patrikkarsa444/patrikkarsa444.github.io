import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "../layout"

export default function ManagementPage() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>System management tools will be implemented here.</p>
        </CardContent>
      </Card>
    </Layout>
  )
}

