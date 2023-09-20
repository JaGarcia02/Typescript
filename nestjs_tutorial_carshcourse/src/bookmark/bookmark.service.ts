import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findMany({
        where: {
          userId,
        },
      });
      return bookmark;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async getBookmarksById(userId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: { id: bookmarkId, userId },
      });
      return bookmark;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          userId,
          ...dto,
        },
      });
      return bookmark;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async editBookmarkById(
    userId: number,
    dto: EditBookmarkDto,
    bookmarkId: number,
  ) {
    try {
      const bookmark_data = await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
      if (!bookmark_data || bookmark_data.userId !== userId) {
        throw new ForbiddenException('Access to resources denied');
      }

      return this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark_data = await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
      if (!bookmark_data || bookmark_data.userId !== userId) {
        throw new ForbiddenException('Access to resources denied');
      }
      await this.prisma.bookmark.delete({
        where: { id: bookmarkId },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
