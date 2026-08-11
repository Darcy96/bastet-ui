import type { Meta, StoryObj } from '@storybook/react';
import { useGlobals } from 'storybook/preview-api';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { ThemeName } from '../../theme/tokens';

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeLocale: { control: 'radio', options: ['en', 'es'] },
  },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeLocale: 'en',
    locales: [
      { value: 'en', label: 'EN', icon: '🇺🇸' },
      { value: 'es', label: 'ES', icon: '🇪🇸' },
    ],
    onLocaleChange: () => {},
  },
  render: (args) => {
    const [globals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return (
      <div data-theme={activeTheme} style={{ padding: '24px', background: 'var(--bst-bg, #fff)' }}>
        <LanguageSwitcher {...args} onLocaleChange={(locale) => console.log('Changed locale to:', locale)} />
      </div>
    );
  },
};
