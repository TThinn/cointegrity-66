
import React, { ErrorInfo, ReactNode } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { validateReactImport } from '@/utils/reactValidation';

interface SafeTooltipProviderProps {
  children: ReactNode;
}

interface SafeTooltipProviderState {
  hasError: boolean;
  error?: Error;
}

/**
 * Safe wrapper for TooltipProvider that handles React module issues
 */
class SafeTooltipProvider extends React.Component<SafeTooltipProviderProps, SafeTooltipProviderState> {
  constructor(props: SafeTooltipProviderProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SafeTooltipProviderState {
    console.error('❌ SafeTooltipProvider caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('❌ SafeTooltipProvider error details:', { error, errorInfo });
  }

  componentDidMount() {
    try {
      validateReactImport();
    } catch (error) {
      console.error('❌ React validation failed in SafeTooltipProvider:', error);
      this.setState({ hasError: true, error: error as Error });
    }
  }

  render() {
    if (this.state.hasError) {
      console.warn('⚠️ SafeTooltipProvider rendering without TooltipProvider due to error');
      // Render children without TooltipProvider if there's an error
      return this.props.children;
    }

    try {
      return (
        <TooltipProvider delayDuration={300}>
          {this.props.children}
        </TooltipProvider>
      );
    } catch (error) {
      console.error('❌ TooltipProvider failed to render:', error);
      // Fallback to rendering children without tooltips
      return this.props.children;
    }
  }
}

export default SafeTooltipProvider;
