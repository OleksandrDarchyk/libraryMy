
using Infrastructure.Postgres.Scaffolding;
using Xunit;

namespace tests;

public class SetupTests(MyDbContext ctx)
{
    [Fact]
    public void XunitDependencyInjectionCanFindService()
    {
        Assert.Equal(0, ctx.Authors.ToList().Count);
    }
}