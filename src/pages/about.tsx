import { Suspense } from "solid-js";
import AboutData from "./about.data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function About() {
  const name = AboutData();

  return (
    <div class="container mx-auto max-w-4xl p-4 pb-24 space-y-6">
      <h1 class="text-3xl font-bold tracking-tight text-foreground">
        O aplikaci <Suspense fallback="">{name()}</Suspense>
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Cíl projektu</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground leading-relaxed">
            Sledování a spravování obsahu spíže. Aplikace informuje uživatele o položkách,
            které si má koupit a které mu docházejí. Cílem je zjednodušit správu domácích zásob
            a omezit plýtvání potravinami.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Náš Tým</CardTitle>
          <CardDescription>Autoři projektu (Tým Spiz-E)</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="flex flex-col space-y-1">
              <span class="font-semibold text-lg">Josef Michalík</span>
              <span class="text-sm text-muted-foreground">Webová Aplikace (SolidJS)</span>
            </div>
            <div class="flex flex-col space-y-1">
              <span class="font-semibold text-lg">Patrik Puškár</span>
              <span class="text-sm text-muted-foreground">Backend (FastAPI) & Desktop (WPF)</span>
            </div>
            <div class="flex flex-col space-y-1">
              <span class="font-semibold text-lg">Petr Georgiev</span>
              <span class="text-sm text-muted-foreground">Android Aplikace (NativeScript)</span>
            </div>
            <div class="flex flex-col space-y-1">
              <span class="font-semibold text-lg">Jan Ukropec</span>
              <span class="text-sm text-muted-foreground">Desktop Aplikace (JavaFX)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Architektura a Technologie</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold mb-2">Backend</h3>
              <p class="text-sm text-muted-foreground">
                Postaven na <strong>FastAPI (Python)</strong>, poskytuje REST API a SSE (Server Sent Events) pro real-time synchronizaci.
                Běží na serveru Wranglers Software.
              </p>
            </div>
            <div>
              <h3 class="font-semibold mb-2">Frontend - Web</h3>
              <p class="text-sm text-muted-foreground">
                Implementován pomocí <strong>SolidJS</strong> pro vysoký výkon a reaktivitu.
                Využívá <strong>TanStack Query</strong> pro správu dat a <strong>TailwindCSS</strong> pro moderní design.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="text-center text-sm text-muted-foreground pt-8">
        <p>Semestrální projekt ITU 2025/2026</p>
      </div>
    </div>
  );
}
