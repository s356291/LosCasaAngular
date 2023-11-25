﻿// <auto-generated />
using LosCasaAngular.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LosCasaAngular.Migrations
{
    [DbContext(typeof(ListingDbContext))]
    partial class ListingDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true);

            modelBuilder.Entity("LosCasaAngular.Models.Listing", b =>
                {
                    b.Property<int>("ListingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasAnnotation("Relational:JsonPropertyName", "ListingId");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT")
                        .HasAnnotation("Relational:JsonPropertyName", "Description");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("TEXT")
                        .HasAnnotation("Relational:JsonPropertyName", "ImageUrl");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasAnnotation("Relational:JsonPropertyName", "Name");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT")
                        .HasAnnotation("Relational:JsonPropertyName", "Price");

                    b.HasKey("ListingId");

                    b.ToTable("Listings");
                });
#pragma warning restore 612, 618
        }
    }
}