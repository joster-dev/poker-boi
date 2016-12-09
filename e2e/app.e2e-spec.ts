import { PokerBoiPage } from './app.po';

describe('poker-boi App', function() {
  let page: PokerBoiPage;

  beforeEach(() => {
    page = new PokerBoiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
