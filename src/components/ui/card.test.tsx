import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card Components', () => {
  it('renders Card with children', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders CardHeader with title and description', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders CardContent with children', () => {
    render(
      <Card>
        <CardContent>
          <p>Content Text</p>
        </CardContent>
      </Card>
    );
    expect(screen.getByText('Content Text')).toBeInTheDocument();
  });

  it('renders CardFooter with children', () => {
    render(
      <Card>
        <CardFooter>
          <button>Footer Button</button>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    render(
      <Card className="custom-class">
        <div>Content</div>
      </Card>
    );
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('custom-class');
  });
});
