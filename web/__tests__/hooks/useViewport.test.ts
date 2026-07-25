import { renderHook, act } from '@testing-library/react';
import { useViewport } from '../../src/hooks/useViewport';

describe('useViewport', () => {
  const setWidth = (w: number) => {
    (window as any).innerWidth = w;
    window.dispatchEvent(new Event('resize'));
  };

  it('returns mobile at 375 px', () => {
    setWidth(375);
    const { result } = renderHook(() => useViewport());
    expect(result.current).toBe('mobile');
  });

  it('returns tablet at 900 px', () => {
    setWidth(900);
    const { result } = renderHook(() => useViewport());
    expect(result.current).toBe('tablet');
  });

  it('returns desktop at 1280 px', () => {
    setWidth(1280);
    const { result } = renderHook(() => useViewport());
    expect(result.current).toBe('desktop');
  });
});
