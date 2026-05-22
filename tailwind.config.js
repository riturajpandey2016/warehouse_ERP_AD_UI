/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    // Toggle classes
    'left-0.5',
    'left-4',
    'left-4.5',
    // Floating label classes
    'peer-placeholder-shown:scale-100',
    'peer-placeholder-shown:translate-y-2.5',
    'peer-focus:scale-75',
    'peer-focus:-translate-y-4',
    'peer-focus:text-blue-600',
    'peer-focus:text-blue-500',
    'start-2.5',
    // Dynamic width classes for label inputs
    'w-24', 'w-28', 'w-32', 'w-36', 'w-40', 'w-44', 'w-48', 'w-52', 'w-56', 'w-60',
    // Responsive grid
    'md:grid-cols-2', 'md:grid-cols-3',
    'lg:grid-cols-3', 'lg:grid-cols-4',
    // Translate classes for floating labels
    '-translate-y-4',
    'translate-y-2.5',
    'scale-75',
    'scale-100',
    // Dynamic color classes potentially used
    'bg-blue-600',
    'bg-slate-300',
    'bg-slate-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
