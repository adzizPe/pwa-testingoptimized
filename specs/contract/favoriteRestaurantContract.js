/* eslint-disable no-undef */
const itActsAsFavoriteRestoModel = (FavIdb) => {
  it('should return the resto that has been added', async () => {
    FavIdb.putFavorite({ id: 1 });
    FavIdb.putFavorite({ id: 2 });

    expect(await FavIdb.getFavorite(1)).toEqual({ id: 1 });
    expect(await FavIdb.getFavorite(2)).toEqual({ id: 2 });
    expect(await FavIdb.getFavorite(3)).toEqual(undefined);
  });

  it('should refuse a resto from being added if it does not have the correct property', async () => {
    FavIdb.putFavorite({ aProperty: 'property' });

    expect(await FavIdb.getAllFavorite()).toEqual([]);
  });

  it('can return all of the resto that have been added', async () => {
    FavIdb.putFavorite({ id: 1 });
    FavIdb.putFavorite({ id: 2 });

    expect(await FavIdb.getAllFavorite()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite resto', async () => {
    FavIdb.putFavorite({ id: 1 });
    FavIdb.putFavorite({ id: 2 });
    FavIdb.putFavorite({ id: 3 });

    await FavIdb.deleteFavorite(1);

    expect(await FavIdb.getAllFavorite()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a resto even though the resto has not been added', async () => {
    FavIdb.putFavorite({ id: 1 });
    FavIdb.putFavorite({ id: 2 });
    FavIdb.putFavorite({ id: 3 });

    await FavIdb.deleteFavorite(4);

    expect(await FavIdb.getAllFavorite()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestoModel };
