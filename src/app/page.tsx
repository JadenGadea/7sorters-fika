import { characters } from "@/data/characters";
import CharacterCard from "@/components/CharacterCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            7Sorters Fika
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Mata en karaktär, ge en fika. Din slant ger en ensam äldre person
            sällskap över en kopp kaffe.
          </p>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </section>

        <section className="text-center text-sm text-gray-500 space-y-4">
          <h2 className="text-base font-semibold text-gray-700">
            Hur funkar det?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div>
              <p className="text-2xl mb-1">📱</p>
              <p>Tryck på NFC-taggen på cafébordet</p>
            </div>
            <div>
              <p className="text-2xl mb-1">🍪</p>
              <p>Mata karaktären via Swish</p>
            </div>
            <div>
              <p className="text-2xl mb-1">☕</p>
              <p>Pengarna ger en äldre person fika och sällskap</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
