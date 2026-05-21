import type { Preview } from '@storybook/react-vite'

import '../src/main/index.css'
import './preview.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="storybook-shell">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#f8fbfd' },
        { name: 'surface', value: '#ffffff' },
        { name: 'ink', value: '#0f172a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
