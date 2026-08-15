import type { Meta, StoryObj } from '@storybook/react';
import { useGlobals } from 'storybook/preview-api';
import { Carousel } from './Carousel';
import { BstThemeProvider, useBstTheme } from '../../theme';
import type { ThemeName } from '../../theme/tokens';

const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { themeName, token } = useBstTheme();
  return (
    <div 
      data-theme={themeName} 
      style={{ 
        width: '400px',
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
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  <div key="1" style={{ width: '280px', height: '200px', background: '#1890ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '8px', fontSize: '24px', fontWeight: 'bold' }}>Slide 1</div>,
  <div key="2" style={{ width: '280px', height: '200px', background: '#52c41a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '8px', fontSize: '24px', fontWeight: 'bold' }}>Slide 2</div>,
  <div key="3" style={{ width: '280px', height: '200px', background: '#faad14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '8px', fontSize: '24px', fontWeight: 'bold' }}>Slide 3</div>,
];

export const Default: Story = {
  args: {
    items: [],
  },
  render: (args) => {
    const [globals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    
    return (
      <BstThemeProvider theme={activeTheme}>
        <StoryWrapper>
          <Carousel {...args} items={mockItems} />
        </StoryWrapper>
      </BstThemeProvider>
    );
  },
};
