import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Vitajte v Systéme spravovania zákazníkov</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Vyberte možnosť z bočného panela pre správu informácií o zákazníkoch, overenie ID, kontrolu hodnotenia
            zákazníkov a ďalšie.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nástenka</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="mb-4">
            <Input placeholder="Zadajte nové oznámenie" className="mb-2" />
            <Button type="submit">Pridať oznámenie</Button>
          </form>
          <ul className="space-y-2">
            <li className="border p-2 rounded">
              <p>Príklad oznámenia</p>
              <small>{new Date().toLocaleString()}</small>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

