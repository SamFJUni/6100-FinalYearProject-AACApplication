import React from 'react';
import { render } from '@testing-library/react-native';
import SymbolItem from '../Styling/SymbolItem';

describe('SymbolItem', () => {
  it('renders the symbol name and image correctly', () => {
    const symbol = {
      id: 1,
      name: 'Test Symbol',
      category_id: 1,
      image_url: 'test-image.png',
      background_colour: '#fffff',
    };
    const symbolSize = 200;

    const { getByText, getByTestId } = render(
      <SymbolItem symbol={symbol} symbolSize={symbolSize} />,
    );

    expect(getByText('Test Symbol')).toBeTruthy();
    const image = getByTestId('symbol-image');
    expect(image.props.source.uri).toBe('test-image.png');
  });
});




