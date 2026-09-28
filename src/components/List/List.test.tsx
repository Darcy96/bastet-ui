import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BstThemeProvider } from '../../theme';
import { List, ListItem } from './List';
import styles from './List.module.css';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<BstThemeProvider>{ui}</BstThemeProvider>);
};

describe('List Component', () => {

  // Test 1: Renderiza la lista y sus hijos
  it('renders list and its items', () => {
    renderWithTheme(
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </List>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  // Test 2: Variante por defecto es 'shape'
  it('applies the shape variant by default', () => {
    renderWithTheme(
      <List>
        <ListItem data-testid="list-item">Item 1</ListItem>
      </List>
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toHaveClass(styles.hasShape);
  });

  // Test 3: Permite cambiar a variant 'icon'
  it('renders theme icons when variant is icon', () => {
    renderWithTheme(
      <List variant="icon">
        <ListItem data-testid="list-item">Item 1</ListItem>
      </List>
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).not.toHaveClass(styles.hasShape);
    
    // Al no tener customIcon y usar la variante 'icon', el span wrapper debe existir
    const iconWrapper = listItem.querySelector(`.${styles.iconWrapper}`);
    expect(iconWrapper).toBeInTheDocument();
  });

  // Test 4: Soporta customIcon por cada ListItem
  it('renders custom icon if provided', () => {
    renderWithTheme(
      <List variant="shape">
        <ListItem data-testid="list-item" customIcon="✅">Success</ListItem>
      </List>
    );

    const listItem = screen.getByTestId('list-item');
    // Si tiene customIcon, ignora el CSS shape
    expect(listItem).not.toHaveClass(styles.hasShape);
    expect(screen.getByText('✅')).toBeInTheDocument();
  });

  // Test 5: Acepta custom className
  it('accepts custom classNames for List and ListItem', () => {
    renderWithTheme(
      <List className="custom-list">
        <ListItem className="custom-item" data-testid="list-item">Item 1</ListItem>
      </List>
    );

    const list = screen.getByRole('list'); // <ul>
    const listItem = screen.getByTestId('list-item');

    expect(list).toHaveClass(styles.list);
    expect(list).toHaveClass('custom-list');
    
    expect(listItem).toHaveClass(styles.listItem);
    expect(listItem).toHaveClass('custom-item');
  });

  // Test 6: Forward Refs funcionan
  it('forwards refs correctly', () => {
    const listRef = React.createRef<HTMLUListElement>();
    const itemRef = React.createRef<HTMLLIElement>();

    renderWithTheme(
      <List ref={listRef}>
        <ListItem ref={itemRef}>Item 1</ListItem>
      </List>
    );

    expect(listRef.current?.tagName).toBe('UL');
    expect(itemRef.current?.tagName).toBe('LI');
  });

});
