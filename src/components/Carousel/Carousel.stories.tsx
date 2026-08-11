import type { Meta, StoryObj } from '@storybook/react';
import { useGlobals } from 'storybook/preview-api';
import { Carousel } from './Carousel';
import type { ThemeName } from '../../theme/tokens';

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
      <div data-theme={activeTheme} style={{ width: '400px', padding: '24px', background: 'var(--bst-bg, #fff)' }}>
        <Carousel {...args} items={mockItems} />
      </div>
    );
  },
};
