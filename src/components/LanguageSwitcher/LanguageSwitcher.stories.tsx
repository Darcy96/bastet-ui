import type { Meta, StoryObj } from '@storybook/react-vite';
import { useGlobals } from 'storybook/preview-api';
import { BstThemeProvider, useBstTheme } from '../../theme';
import type { ThemeName } from '../../theme/tokens';
import { LanguageSwitcher } from './LanguageSwitcher';

const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { themeName, token } = useBstTheme();
  return (
    <div 
      data-theme={themeName} 
      style={{ 
        padding: '24px', 
        background: token.colorBgContainer,
        '--bst-primary': token.colorPrimary,
        '--bst-bg': token.colorBgContainer,
        '--bst-text': token.colorText,
        '--bst-border': token.colorBorder,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

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
      <BstThemeProvider theme={activeTheme}>
        <StoryWrapper>
          <LanguageSwitcher {...args} onLocaleChange={(locale) => console.log('Changed locale to:', locale)} />
        </StoryWrapper>
      </BstThemeProvider>
    );
  },
};

export const DropdownVariant: Story = {
  args: {
    ...Default.args,
    variant: 'dropdown',
  },
  render: Default.render,
};
